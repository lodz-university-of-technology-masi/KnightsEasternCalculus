package model.tests;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@DynamoDBDocument
public class CloseQuestion implements Serializable {
    private String question;
    private ArrayList<String> correctAnswers;
    private ArrayList<String> incorrectAnswers;
    private int maxScore;

    public CloseQuestion() {}

    public CloseQuestion(CloseQuestion closeQuestion) {
        this.question = closeQuestion.question;
        this.correctAnswers = closeQuestion.correctAnswers;
        this.incorrectAnswers = closeQuestion.incorrectAnswers;
        this.maxScore = closeQuestion.maxScore;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public ArrayList<String> getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(ArrayList<String> correctAnswers) {
        this.correctAnswers = correctAnswers;
    }

    public ArrayList<String> getIncorrectAnswers() {
        return incorrectAnswers;
    }

    public void setIncorrectAnswers(ArrayList<String> incorrectAnswers) {
        this.incorrectAnswers = incorrectAnswers;
    }

    public int getMaxScore() {
        return maxScore;
    }

    public void setMaxScore(int maxScore) {
        this.maxScore = maxScore;
    }
}
