## Article Page
### GET Parameters
* **slug** – (string)

### Response
* **OK** – [article.json](assets/data/article.json)
* **Error** – 404

---
## Benefits Slider
### GET Parameters
* none

### Response
* **OK** [benefits.json](assets/data/benefits.json)
* **Error** – 404

---
## Questions
### GET Parameters
* none

### Response
* **OK** [questions.json](assets/data/questions.json)
* **Error** – 404

---
## Featured Product (Home page)
### GET Parameters
* none

### Response
* **OK** [featuredProduct.json](assets/data/featuredProduct.json)
* **Error** – 404

---
## Catalog Page
### GET Parameters
* **category** – (string)
* **subcategory** – (string)

### Response
* **OK** [catalog.json](assets/data/catalog.json)
* **Error** – 404

---
## News (Home page)
### GET Parameters
* none

### Response
* **OK** [news.json](assets/data/news.json)
* **Error** – 404

---
## Product Page
### GET Parameters
* **category** – (string)
* **subcategory** – (string)
* **slug** – (string)

### Response
* **OK** [product.json](assets/data/product.json)
* **Error** – 404

---
## Product List (everywhere)
### GET Parameters
* **sort** – (string)
* **skip** – (string)
* **count** – (number)
* **min_price** – (number)
* **max_price** – (number)
* **category** – (string)
* **subcategory[]** – (string array)
* **slug** – For relative products (string)

### Response
* **OK** [product.json](assets/data/product.json)
* **Error** – 404

---
## Catalog Structure (Constructor page)
### GET Parameters
* none

### Response
* **OK** [structure.json](assets/data/structure.json)
* **Error** – 404

---
## Textures (Product and Constructor)
### GET Parameters
* **category**  – (string)
* **subcategory** – (string)
* **slug** – Product slug (missing in constructor) (string)

### Response
* **OK** [textures.json](assets/data/textures.json)
* **Error** – 404

---
## Reviews
### GET Parameters
* **product** – ID (string)
* **limit** – Count (number)

### Response
* **OK** [reviews.json](assets/data/reviews.json)
* **Error** – 404

---
## Review Form
### POST Parameters
* **product** – ID (string)
* **rating** – (number)
* **name** – (string)
* **email** – (string)
* **review** – Text (string)

### Response
* **OK** [review-post-response.json](assets/data/review-post-response.json)
* **Error** Not "ok" in review-post-response.json[status]


---
## Search Form
### GET Parameters
* **term** – (string)

### Response
* **OK** [search.json](assets/data/search.json)
* **No Results** Empty array in [search.json](assets/data/search.json)
* **Error** 404

---
## Order Form (order, callme)
### POST Parameters
* **phone** – (string)
* **time** – Call time (string)
* **text** – List of products or comment (string)
* **name** – Customer (string)

### Response
* **OK** [order.json](assets/data/order.json)
* **Error** Not "ok" in order.json[status]

---
## Feedback Form
### POST Parameters
* **email** – Email (string)
* **name** – Customer name (string)
* **text** – List of products or comment (string)

### Response
* **OK** [order.json](assets/data/order.json)
* **Error** Not "ok" in order.json[status]
