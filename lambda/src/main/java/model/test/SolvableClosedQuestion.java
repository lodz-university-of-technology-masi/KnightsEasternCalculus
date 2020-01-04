package model.test;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;

public class SolvableClosedQuestion implements Serializable {

    private String question;
    private ArrayList<String> answers;
    private ArrayList<Integer> chosenAnswers;
    private ArrayList<Integer> correctAnswers;
    private int maxScore;

    public SolvableClosedQuestion() {
    }

    public SolvableClosedQuestion(CloseQuestion closeQuestion) {
        this.question = closeQuestion.getQuestion();
        this.maxScore = closeQuestion.getMaxScore();
        this.answers = closeQuestion.getCorrectAnswers();
        this.answers.addAll(closeQuestion.getIncorrectAnswers());
        Collections.shuffle(this.answers);
        this.correctAnswers = new ArrayList<>();
        this.chosenAnswers = new ArrayList<Integer>();

        selectCorrectAnswers(closeQuestion.getCorrectAnswers());
    }

    public void selectCorrectAnswers(ArrayList<String> answers) {
        for (int i = 0; i < answers.size(); i++) {
            if (answers.get(i).equals(this.answers.get(i))) {
                this.correctAnswers.add(i);
            }
        }
    }


    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public ArrayList<String> getAnswers() {
        return answers;
    }

    public void setAnswers(ArrayList<String> answers) {
        this.answers = answers;
    }

    public ArrayList<Integer> getChosenAnswers() {
        return chosenAnswers;
    }

    public void setChosenAnswers(ArrayList<Integer> chosenAnswers) {
        this.chosenAnswers = chosenAnswers;
    }

    public int getMaxScore() {
        return maxScore;
    }

    public void setMaxScore(int maxScore) {
        this.maxScore = maxScore;
    }
}
