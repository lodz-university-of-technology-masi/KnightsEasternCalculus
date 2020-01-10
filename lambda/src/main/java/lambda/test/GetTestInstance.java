package lambda.test;

import com.amazonaws.services.lambda.runtime.Context;
import lambda.Handler;
import model.test.SolvableClosedQuestion;
import model.test.SolvableOpenQuestion;
import model.test.TestInstance;
import util.Response;

import java.util.ArrayList;

public class GetTestInstance extends Handler<String> {
    @Override
    public Response handleRequest(String input, Context context) {
        String[] index = input.split("=");
        TestInstance test = getMapper().load(TestInstance.class, index[0], Long.parseLong(index[1]));
        if (test == null) {
            return new Response(404, "Test not found");
        } else {
            if (test.getStatus() == 0) {
                for (SolvableClosedQuestion q : test.getCloseQuestions()) {
                    q.setCorrectAnswers(new ArrayList<>());
                }
                for (SolvableOpenQuestion q : test.getOpenQuestions()) {
                    q.setCorrectAnswer("");
                }
            } else if (test.getStatus() == 1) {
                for (SolvableClosedQuestion q : test.getCloseQuestions()) {
                    q.setReceivedScore(0);
                }
                for (SolvableOpenQuestion q : test.getOpenQuestions()) {
                    q.setReceivedScore(0);
                }
            }
            return new Response(200, test);
        }
    }
}
