package com.igorszalas.fitDiet.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.igorszalas.fitDiet.models.Comment;
import com.igorszalas.fitDiet.models.Post;
import com.igorszalas.fitDiet.repositories.PostRepository;

@Service
public class PostServiceImpl implements PostService {
    @Autowired
    PostRepository postRepository;

    public void deleteCommentByID(String postID, String commentID) {
        Optional<Post> userPost = postRepository.findById(postID);
        Post post = userPost.get();
        List<Comment> userComments = post.getComments();
        for (Comment comment : userComments) {
            if (comment.getCommentID().equals(commentID)) {
                System.out.println("commentID ------> " + commentID);
                System.out.println("comment.getCommentID() ------> " + comment.getCommentID());
                userComments.remove(comment);
                System.out.println("AFTER REMOVE");
            }
        }
        System.out.println("AFTER FOR LOOP");
        post.setComments(userComments);
        System.out.println("AFTER SET COMMENT");
        postRepository.save(post);
        System.out.println("AFTER SAVING");
    }

    public void addNewComment(String postID, Comment commentData) {
        Optional<Post> userPost = postRepository.findById(postID);
        Post post = userPost.get();
        List<Comment> userComment = post.getComments();

        if (userComment == null)
            userComment = new ArrayList<>();

        userComment.add(commentData);
        post.setComments(userComment);
        postRepository.save(post);
    }

}
