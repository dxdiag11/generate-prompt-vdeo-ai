# Instruksi Deployment Docker untuk Generator Prompt Video

## Prasyarat
- Docker dan Docker Compose terinstall di VPS Anda
- Git untuk mengkloning repository (opsional)

## Langkah-langkah Deployment

### 1. Clone repository (jika belum ada di VPS)
```bash
git clone <URL_REPOSITORY_ANDA>
cd generator-prompt-video-v1
```

### 2. Build dan jalankan container Docker
```bash
docker-compose up -d --build
```

Perintah ini akan:
- Build image Docker berdasarkan Dockerfile
- Menjalankan container dalam mode detached (background)

### 3. Verifikasi aplikasi berjalan
Aplikasi seharusnya berjalan di port 3000. Anda dapat mengaksesnya melalui:
```
http://IP_VPS_ANDA:3000
```

### 4. Melihat log aplikasi
```bash
docker-compose logs -f app
```

### 5. Menghentikan aplikasi
```bash
docker-compose down
```

## Konfigurasi Tambahan

### Menggunakan Nginx sebagai Reverse Proxy
Untuk mengekspos aplikasi dengan domain dan HTTPS, tambahkan konfigurasi Nginx:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Memperbarui Aplikasi
Untuk memperbarui aplikasi setelah perubahan kode:
```bash
git pull  # Jika menggunakan git
docker-compose up -d --build
```

### Environment Variables
Jika aplikasi memerlukan environment variables, tambahkan di docker-compose.yml:
```yaml
environment:
  - NODE_ENV=production
  - API_KEY=your_api_key
  # tambahkan environment variables lainnya
``` 