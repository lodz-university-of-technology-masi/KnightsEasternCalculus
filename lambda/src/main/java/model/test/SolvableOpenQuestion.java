package model.test;

public class SolvableOpenQuestion {

    private String question;
    private int maxScore;
    private String answer;

    public SolvableOpenQuestion() {
    }

    public SolvableOpenQuestion(OpenQuestion openQuestion) {
        this.question = openQuestion.getQuestion();
        this.maxScore = openQuestion.getMaxScore();
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
}
