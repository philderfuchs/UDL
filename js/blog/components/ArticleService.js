import { observable } from "mobx"

export class ArticleService {

    @observable articles = [];
    @observable previews = [];
    @observable countOfPreviews = 2;

    constructor() {
        this.fetchArticles();
    }

    setSomePreviews() {
        this.previews = this.articles.slice(0, this.countOfPreviews);
    }

    increasePreviewCount(i) {
        this.countOfPreviews += i;
        this.setSomePreviews();
    }

    hasMorePreviews() {
        return this.countOfPreviews < this.articles.length;
    }

    fetchArticles() {
        $.get("https://udl.cloudno.de/articles", (res) => {
            this.articles = res;
            this.setSomePreviews();
        })
    }
}

export default new ArticleService();