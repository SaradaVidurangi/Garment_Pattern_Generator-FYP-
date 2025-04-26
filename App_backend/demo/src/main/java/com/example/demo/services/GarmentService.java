package com.example.demo.services;

import java.io.IOException;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.utils.MultipartInputStreamFileResource;

@Service
public class GarmentService {

    private static final String PYTHON_API_URL = "http://localhost:5000/predict";
    private final RestTemplate restTemplate = new RestTemplate();

    public byte[] processPatternGeneration(MultipartFile file, String size) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty!");
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("image", new MultipartInputStreamFileResource(file.getInputStream(), file.getOriginalFilename()));
        body.add("size", size);

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        ResponseEntity<byte[]> response = restTemplate.exchange(
                PYTHON_API_URL,
                HttpMethod.POST,
                requestEntity,
                byte[].class
        );

        if (response.getStatusCode() == HttpStatus.OK) {
            return response.getBody();
        } else {
            throw new RuntimeException("Flask service returned error.");
        }
    }
}
