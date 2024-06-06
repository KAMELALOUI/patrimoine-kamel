package com.kamel1.media.repository;

import com.kamel1.media.models.Media;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface MediaRepository extends JpaRepository<Media, Long> {


}
