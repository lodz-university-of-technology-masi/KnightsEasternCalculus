package lambda.test;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.lambda.runtime.Context;
import lambda.Handler;
import model.test.SolvableTest;
import model.test.Test;
import model.test.TestInstance;
import util.Response;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class SolveTest extends Handler<SolvableTest> {
    @Override
    public Response handleRequest(SolvableTest input, Context context) {
        if (input != null) {
            String appID = input.getApplicantID();
            Timestamp time = input.getTimestamp();
            List<TestInstance> tests = getMapper().scan(TestInstance.class, new DynamoDBScanExpression());
            TestInstance test = new TestInstance();
            for (TestInstance t : tests) {
                if (t.getApplicantID().equals(appID) && t.getTimestamp().equals(time)) {
                    test = t;
                    break;
                }
            }

            if (test.getApplicantID() != null) {
                ArrayList<Double> pointsClosed = checkClosed(input, test);
                ArrayList<Double> pointsOpen = checkOpen(input, test);

                int sum = 0;
                for (Double i : pointsClosed){
                    sum += i;
                }
                for (Double i : pointsOpen) {
                    sum += i;
                }

                test.setReceivedScore(sum);

                getMapper().save(test);

                return new Response(200, test.getReceivedScore());
            } else {
                return new Response(500, "Test not found");
            }
        } else {
            return new Response(400, "Input can't be empty");
        }

    }

    private ArrayList<Double> checkClosed(SolvableTest sTest, TestInstance test) {
        ArrayList<Double> answers = new ArrayList<>();
        for (int i = 0; i < sTest.getCloseQuestions().size(); i++) {
            answers.add(0.0);
        }

        for (int i = 0; i < sTest.getCloseQuestions().size() ; i++) {
            for (String answer : sTest.getCloseQuestions().get(i).getChosenAnswers()) {
                if (test.getCloseQuestions().get(i).getCorrectAnswers().contains(answer)) {
                    Double tmp = answers.get(i);
                    answers.set(i, tmp + (test.getCloseQuestions().get(i).getMaxScore() / test.getCloseQuestions().size()));
                }
            }
        }

        return answers;
    }

    private ArrayList<Double> checkOpen(SolvableTest sTest, TestInstance test) {
        ArrayList<Double> answers = new ArrayList<>();
        for (int i = 0; i < sTest.getOpenQuestions().size(); i++) {
            answers.add(0.0);
        }

        for (int i = 0; i < sTest.getOpenQuestions().size(); i++) {
            if (sTest.getOpenQuestions().get(i).getAnswer().equals(test.getOpenQuestions().get(i).getCorrectAnswer())) {
                answers.set(i, (double) test.getOpenQuestions().get(i).getMaxScore());
            }
        }

        return answers;
    }
}
