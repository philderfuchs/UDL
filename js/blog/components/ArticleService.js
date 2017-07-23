import {EventEmitter} from "events";

class ArticleService extends EventEmitter {
    constructor() {
        super();
        this.articles = [];
        this.countOfPreviews = 1;
        this.fetchArticles();
    }

    getAllPreviews() {
        return this.articles;
    }

    getSomePreviews() {
        return this.articles.slice(0, this.countOfPreviews);
    }

    increasePreviewCount(i) {
        this.countOfPreviews += i;
        this.emit("change");
    }

    hasMorePreviews() {
        return this.countOfPreviews < this.articles.length;
    }

    getArticle(id) {
        return this.articles.find(v => v.id === id);
    }

    fetchArticles() {
        $.get("https://udl.cloudno.de/articles", (res) => {
            this.articles = res;
            this.emit("change");
        })
    }
}

const service = new ArticleService();

export default service;