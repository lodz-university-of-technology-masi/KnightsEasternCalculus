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
                if (test.getCloseQuestions() != null) {
                    for (int i = 0; i < test.getCloseQuestions().size(); i++) {
                        test.getCloseQuestions().get(i).setCorrectAnswers(new ArrayList<>());
                    }
                } else {
                    test.setCloseQuestions(new ArrayList<>());
                }
                if (test.getOpenQuestions() != null) {
                    for (int i = 0; i < test.getOpenQuestions().size(); i++) {
                        test.getOpenQuestions().get(i).setCorrectAnswer("");
                    }
                } else {
                    test.setOpenQuestions(new ArrayList<>());
                }
                if (test.getValueQuestions() != null) {
                    for (int i = 0; i < test.getValueQuestions().size(); i++) {
                        test.getValueQuestions().get(i).setCorrectAnswer(0f);
                    }
                } else {
                    test.setValueQuestions(new ArrayList<>());
                }
            } else if (test.getStatus() == 1) {
                for (int i = 0; i < test.getCloseQuestions().size(); i++) {
                    test.getCloseQuestions().get(i).setReceivedScore(0);
                }
                for (int i = 0; i < test.getOpenQuestions().size(); i++ ){
                    test.getOpenQuestions().get(i).setReceivedScore(0);
                }
                for (int i = 0; i < test.getValueQuestions().size(); i++) {
                    test.getValueQuestions().get(i).setReceivedScore(0);
                }
            }
            return new Response(200, test);
        }
    }
}
