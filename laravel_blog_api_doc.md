# 📜 Laravel Blog API Documentation

## **Base URL**
```
http://your-domain.com/api
```

---

## **Authentication**
Some endpoints require authentication.  
Use **Bearer Token** from `login` or `register` response:

**Example Header**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

## **1. Authentication**
---

### **Register**
```
POST /register
```
**Body:**
| Field     | Type   | Required |
|----------|--------|----------|
| name     | string | Yes |
| email    | string | Yes |
| password | string | Yes |
| password_confirmation | string | Yes |

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "1|abcd1234..."
}
```

---

### **Login**
```
POST /login
```
**Body:**
| Field     | Type   | Required |
|----------|--------|----------|
| email    | string | Yes |
| password | string | Yes |

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "1|abcd1234..."
}
```

---

### **Logout**
```
POST /logout
```
**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```
**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## **2. Posts**
---

### **List Posts**
```
GET /posts
```
**Query Params:**
| Param    | Type   | Default | Description |
|----------|--------|---------|-------------|
| sort     | string | latest  | latest, likes, views, comments |
| per_page | int    | 10      | Items per page |

---

### **Create Post**
```
POST /posts
```
**Headers:** Auth Required  
**Body:**
| Field           | Type   | Required |
|----------------|--------|----------|
| title          | string | Yes |
| body           | string | Yes |
| status         | enum   | Yes (`draft`, `published`) |
| featured_image | file   | No (image, max 2MB) |

---

### **Get Single Post**
```
GET /posts/{id}
```
**Note:** Increments `views_count` automatically.

---

### **Update Post**
```
PUT /posts/{id}
```
**Headers:** Auth Required  
**Body:** Same as Create Post (fields optional)

---

### **Delete Post**
```
DELETE /posts/{id}
```
**Headers:** Auth Required

---

## **3. Likes**
---

### **Like Post**
```
POST /posts/{post}/like
```
**Headers:** Auth Required

---

### **Unlike Post**
```
DELETE /posts/{post}/like
```
**Headers:** Auth Required

---

## **4. Comments**
---

### **List Comments**
```
GET /posts/{post}/comments
```

---

### **Add Comment**
```
POST /posts/{post}/comments
```
**Headers:** Auth Required  
**Body:**
| Field | Type   | Required |
|-------|--------|----------|
| body  | string | Yes |

---

### **Delete Comment**
```
DELETE /posts/{post}/comments/{comment}
```
**Headers:** Auth Required

---

## **5. Views**
---

- Tracked automatically via `GET /posts/{id}`
- Field `views_count` returned with each post

---

## **Status Codes**
| Code | Meaning |
|------|---------|
| 200  | Success |
| 201  | Created |
| 403  | Unauthorized |
| 404  | Not Found |
| 409  | Conflict |
