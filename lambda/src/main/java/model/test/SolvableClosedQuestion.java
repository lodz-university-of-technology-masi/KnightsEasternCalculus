package model.test;

import java.io.Serializable;
import java.util.ArrayList;

public class SolvableClosedQuestion implements Serializable {

    private String question;
    private ArrayList<String> answers;
    private ArrayList<String> chosenAnswers;
    private int maxScore;

    public SolvableClosedQuestion() {
    }

    public SolvableClosedQuestion(CloseQuestion closeQuestion) {
        this.question = closeQuestion.getQuestion();
        this.maxScore = closeQuestion.getAnswerScore();
        this.answers = closeQuestion.getCorrectAnswers();
        this.answers.addAll(closeQuestion.getIncorrectAnswers());
        this.chosenAnswers = new ArrayList<String>();
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

    public ArrayList<String> getChosenAnswers() {
        return chosenAnswers;
    }

    public void setChosenAnswers(ArrayList<String> chosenAnswers) {
        this.chosenAnswers = chosenAnswers;
    }

    public int getMaxScore() {
        return maxScore;
    }

    public void setMaxScore(int maxScore) {
        this.maxScore = maxScore;
    }
}
