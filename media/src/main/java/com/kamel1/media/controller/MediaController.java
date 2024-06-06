package com.kamel1.media.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kamel1.media.dto.AuthCheckResponseObject;
import com.kamel1.media.dto.JsonResponse;
import com.kamel1.media.models.Media;
import com.kamel1.media.repository.MediaRepository;
import com.kamel1.media.services.CheckAuth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.CompletableFuture;

@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")

@RestController
@RequestMapping("/api/media")
public class MediaController {

    private static final String UPLOAD_DIR = "src/main/resources/static/uploads/";

    @Autowired
    private CheckAuth checkAuth;

    @Autowired
    private MediaRepository mediaRepository;

    @GetMapping("/list")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")

    public ResponseEntity<?> getAllMedia() {
        return ResponseEntity.ok(this.mediaRepository.findAll());
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")

    public ResponseEntity<?> createMedia(
            @RequestHeader(name = "Authorization") String token,
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("descreption") String descreption) throws IOException, InterruptedException, URISyntaxException {
        System.out.println(token);
        HttpClient client = HttpClient.newHttpClient();

        CompletableFuture<AuthCheckResponseObject> futureResponse = client.sendAsync(this.checkAuth.checkAuth(token), HttpResponse.BodyHandlers.ofString())
                .thenApply(HttpResponse::body)
                .thenApply(responseBody -> {
                    try {
                        // Parse JSON response using Jackson
                        ObjectMapper objectMapper = new ObjectMapper();
                        AuthCheckResponseObject responseObject = objectMapper.readValue(responseBody, AuthCheckResponseObject.class);
                        System.out.println("Parsed response (Jackson): " + responseObject);
                        return responseObject;
                    } catch (Exception e) {
                        e.printStackTrace();
                        // Handle exception and return a default/fallback value
                        return new AuthCheckResponseObject(false);
                    }
                });

        AuthCheckResponseObject result = futureResponse.join();

        if (result.isSuccess()) {
            Media media = new Media();
            media.setTitle(title);
            media.setContent(descreption);

            if (file.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new JsonResponse(false, "bad image !!"));
            } else {
                try {
                    // Save the file locally
                    byte[] bytes = file.getBytes();
                    Path path = Paths.get(UPLOAD_DIR + file.getOriginalFilename());
                    Files.write(path, bytes);

                    media.setImageURL("http://localhost:8086/uploads/" + file.getOriginalFilename());
                    this.mediaRepository.save(media);

                    return ResponseEntity.status(HttpStatus.OK).body(new JsonResponse(true, "media published successfully."));
                } catch (IOException e) {
                    e.printStackTrace();
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new JsonResponse(false, "Failed to upload the file"));
                }
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new JsonResponse(false, "Session expired"));
        }
    }
}
