package com.kamel1.mappingservice.repository;

import com.kamel1.mappingservice.model.HeritageSite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HeritageSiteRepository extends JpaRepository<HeritageSite, Long> {
    List<HeritageSite> findByNameContainingIgnoreCase(String name);

    List<HeritageSite> findByLocationContainingIgnoreCase(String location);

    @Query("SELECT h FROM HeritageSite h WHERE h.description LIKE %:keyword%")
    List<HeritageSite> searchByDescription(String keyword);
}
