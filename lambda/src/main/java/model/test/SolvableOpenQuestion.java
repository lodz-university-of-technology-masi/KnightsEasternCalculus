package model.test;

import java.io.Serializable;

public class SolvableOpenQuestion implements Serializable {

    private String question;
    private int maxScore;
    private String answer;
    private String correctAnswer;

    public SolvableOpenQuestion() {
    }

    public SolvableOpenQuestion(OpenQuestion openQuestion) {
        this.question = openQuestion.getQuestion();
        this.maxScore = openQuestion.getMaxScore();
        this.correctAnswer = openQuestion.getCorrectAnswer();
        this.answer = "";
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }


    public int getMaxScore() {
        return maxScore;
    }

    public void setMaxScore(int maxScore) {
        this.maxScore = maxScore;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}
