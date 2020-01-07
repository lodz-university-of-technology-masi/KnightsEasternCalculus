package lambda.applicant;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.lambda.runtime.Context;
import lambda.Handler;
import model.applicant.Applicant;
import model.test.*;
import util.Response;

import java.util.*;
import java.util.stream.Collectors;

public class AssignApplicant extends Handler<AssignApplicant.AssignRequest> {
    @Override
    public Response handleRequest(AssignRequest input, Context context) {
        DynamoDBQueryExpression queryExpression;

        if(!input.isForce()) {
            Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
            eav.put(":val", new AttributeValue().withS(input.getTestId()));

            TestInstance hashKeyValues = new TestInstance();
            hashKeyValues.setApplicantID(input.getApplicantId());

            Map<String, String> attributeNames = new HashMap<>();
            attributeNames.put("#t", "timestamp");

            queryExpression = new DynamoDBQueryExpression()
                    .withHashKeyValues(hashKeyValues)
                    .withFilterExpression("testId = :val")
                    .withExpressionAttributeValues(eav)
                    .withProjectionExpression("#t")
                    .withExpressionAttributeNames(attributeNames);

            List<TestInstance> queryList = new ArrayList<>(getMapper().query(TestInstance.class, queryExpression));

            if (!queryList.isEmpty()) {
                return new Response(409, queryList.stream()
                        .map(test -> test.getTimestamp()).collect(Collectors.toList()));
            }
        }

        Test test = getMapper().load(Test.class, input.getTestId());
        if(test == null) {
            return new Response(404, "Test was not found");
        }

        Applicant applicant = getMapper().load(Applicant.class, input.getApplicantId());
        if(applicant == null) {
            return new Response(404, "Applicant was not found");
        }

        TestInstance testInstance = new TestInstance();

        testInstance.setApplicantID(input.getApplicantId());
        testInstance.setTimestamp(new Date().getTime());
        testInstance.setTitle(test.getTitle());
        testInstance.setCloseQuestions(test.getCloseQuestions().stream()
                .map(question -> new SolvableClosedQuestion(question)).collect(Collectors.toList()));
        testInstance.setOpenQuestions(test.getOpenQuestions().stream()
                .map(question -> new SolvableOpenQuestion(question)).collect(Collectors.toList()));
        testInstance.setMaxScore(testInstance.getCloseQuestions().stream()
                .reduce(0F, (sum, question) -> sum + question.getAnswerScore()*question.getCorrectAnswers().size(), Float::sum));
        testInstance.setMaxScore(testInstance.getOpenQuestions().stream()
                .reduce(testInstance.getMaxScore(), (sum, question) -> sum + question.getMaxScore(), Float::sum));
        testInstance.setStatus(TestStatus.NOTSOLVED.getValue());
        testInstance.setTestId(input.getTestId());

        getMapper().save(testInstance);

        return new Response(200, "The test was added successfully");
    }

    public static class AssignRequest {
        private String applicantId;
        private String testId;
        private boolean force = false;

        public String getApplicantId() {
            return applicantId;
        }

        public void setApplicantId(String applicantId) {
            this.applicantId = applicantId;
        }

        public String getTestId() {
            return testId;
        }

        public void setTestId(String testId) {
            this.testId = testId;
        }

        public boolean isForce() {
            return force;
        }

        public void setForce(boolean force) {
            this.force = force;
        }
    }
}
