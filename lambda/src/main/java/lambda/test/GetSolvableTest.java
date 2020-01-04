package lambda.test;

import com.amazonaws.services.lambda.runtime.Context;
import lambda.Handler;
import model.test.SolvableClosedQuestion;
import model.test.SolvableOpenQuestion;
import model.test.TestInstance;
import util.Response;

import java.util.ArrayList;

public class GetSolvableTest extends Handler<String> {
    @Override
    public Response handleRequest(String input, Context context) {
        TestInstance test = getMapper().load(TestInstance.class, input);
        if (test == null) {
            return new Response(404, "Test not found");
        } else {
            if (test.getStatus() != 2) {
                for (SolvableClosedQuestion q : test.getCloseQuestions()) {
                    q.setCorrectAnswers(new ArrayList<>());
                }
                for (SolvableOpenQuestion q : test.getOpenQuestions()) {
                    q.setCorrectAnswer("");
                }
            }
            return new Response(200, test);
        }
    }
}
