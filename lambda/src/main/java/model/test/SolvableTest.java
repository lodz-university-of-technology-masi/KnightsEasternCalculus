package model.test;

import java.sql.Timestamp;
import java.util.List;

public class SolvableTest {


    private String applicantID;
    private Timestamp timestamp;
    private String title;
    private List<CloseQuestion> closeQuestions;
    private List<OpenQuestion> openQuestions;
    private float maxScore;
    private float receivedScore;
    private TestStatus status;

    public SolvableTest(String applicantID, Timestamp timestamp, String title, List<CloseQuestion> closeQuestions, List<OpenQuestion> openQuestions, float maxScore, float receivedScore, TestStatus status) {
        this.applicantID = applicantID;
        this.timestamp = timestamp;
        this.title = title;
        this.closeQuestions = closeQuestions;
        this.openQuestions = openQuestions;
        this.maxScore = maxScore;
        this.receivedScore = receivedScore;
        this.status = status;
    }

    public String getApplicantID() {
        return applicantID;
    }

    public void setApplicantID(String applicantID) {
        this.applicantID = applicantID;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<CloseQuestion> getCloseQuestions() {
        return closeQuestions;
    }

    public void setCloseQuestions(List<CloseQuestion> closeQuestions) {
        this.closeQuestions = closeQuestions;
    }

    public List<OpenQuestion> getOpenQuestions() {
        return openQuestions;
    }

    public void setOpenQuestions(List<OpenQuestion> openQuestions) {
        this.openQuestions = openQuestions;
    }

    public float getMaxScore() {
        return maxScore;
    }

    public void setMaxScore(float maxScore) {
        this.maxScore = maxScore;
    }

    public float getReceivedScore() {
        return receivedScore;
    }

    public void setReceivedScore(float receivedScore) {
        this.receivedScore = receivedScore;
    }

    public TestStatus getStatus() {
        return status;
    }

    public void setStatus(TestStatus status) {
        this.status = status;
    }
}
