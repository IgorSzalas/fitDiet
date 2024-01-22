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
        List<Comment> userComment = post.getComments();
        for (Comment comment : userComment) {
            if (comment.getCommentID().equals(commentID)) {
                userComment.remove(comment);
            }
        }
        postRepository.save(post);
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
