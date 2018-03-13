import moment from 'moment';
import Model from './BaseModel';
import Comment from "./Comment";
import Tag from "./Tag";
import User from "./User";

export default class Post extends Model {
    resourceName () {
        return 'posts';
    }

    fields () {
        return ['title', 'subtitle', 'body', 'slug'];
    }

    dates () {
        return {
            published_at: 'YYYY-MM-DD'
        };
    }

    relationships () {
        return {
            author: new User(),
            comments: new Comment(),
            tags: new Tag()
        };
    }

    computed () {
        return {
            full_date (post) {
                return post.published_at.format('MMMM Do YYYY');
            },

            human_date (post) {
                return post.published_at.fromNow();
            },

            url (post) {
                return `/read/${post.slug}/${post.id}`;
            },

            is_published (post) {
                return post.published_at.isSameOrBefore(moment())
            }
        };
    }

    navigateToEditPage () {
        window.location.href = `/admin/post/${this.id}/edit`;
    }
}