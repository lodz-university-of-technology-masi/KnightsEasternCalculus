package model.test;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConvertedJson;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

@DynamoDBTable(tableName="TestInstances")
public class TestInstance implements Serializable {

    private String applicantID;
    private String timestamp;
    private String title;
    private List<CloseQuestion> closeQuestions;
    private List<OpenQuestion> openQuestions;
    private float maxScore;
    private float receivedScore;
    private int status;

    public TestInstance(){}

    public TestInstance(String applicantID, String timestamp, String title, List<CloseQuestion> closeQuestions, List<OpenQuestion> openQuestions, float maxScore, float receivedScore, int status) {
        this.applicantID = applicantID;
        this.timestamp = timestamp;
        this.title = title;
        this.closeQuestions = closeQuestions;
        this.openQuestions = openQuestions;
        this.maxScore = maxScore;
        this.receivedScore = receivedScore;
        this.status = status;
    }

    @DynamoDBHashKey(attributeName = "applicantID")
    public String getApplicantID() {
        return applicantID;
    }

    public void setApplicantID(String applicantID) {
        this.applicantID = applicantID;
    }

    @DynamoDBHashKey(attributeName = "timestamp")
    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    @DynamoDBAttribute(attributeName = "title")
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @DynamoDBAttribute(attributeName = "closedQuestions")
    @DynamoDBTypeConvertedJson
    public List<CloseQuestion> getCloseQuestions() {
        return closeQuestions;
    }

    public void setCloseQuestions(List<CloseQuestion> closeQuestions) {
        this.closeQuestions = closeQuestions;
    }

    @DynamoDBAttribute(attributeName = "openQuestions")
    @DynamoDBTypeConvertedJson
    public List<OpenQuestion> getOpenQuestions() {
        return openQuestions;
    }

    public void setOpenQuestions(List<OpenQuestion> openQuestions) {
        this.openQuestions = openQuestions;
    }

    @DynamoDBAttribute(attributeName = "maxScore")
    public float getMaxScore() {
        return maxScore;
    }

    public void setMaxScore(float maxScore) {
        this.maxScore = maxScore;
    }

    @DynamoDBAttribute(attributeName = "receivedScore")
    public float getReceivedScore() {
        return receivedScore;
    }

    public void setReceivedScore(float receivedScore) {
        this.receivedScore = receivedScore;
    }

    @DynamoDBAttribute(attributeName = "status")
    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
