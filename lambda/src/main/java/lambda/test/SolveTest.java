package lambda.test;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperConfig;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.lambda.runtime.Context;
import lambda.Handler;
import model.test.*;
import util.Response;

import java.util.ArrayList;
import java.util.List;

public class SolveTest extends Handler<TestInstance> {
    @Override
    public Response handleRequest(TestInstance input, Context context) {
        if (input != null) {
            TestInstance test = getMapper().load(TestInstance.class, input.getApplicantID(), input.getTimestamp());

            if (test.getApplicantID() == null) {
                return new Response(400, "ApplicantID can't be null");
            }

            test.setReceivedScore(0);

            List<SolvableClosedQuestion> close = new ArrayList<>();
            SolvableClosedQuestion c = null;
            for (int i = 0; i < test.getCloseQuestions().size(); i++) {
                c = test.getCloseQuestions().get(i);
                c.setChosenAnswers(input.getCloseQuestions().get(i).getChosenAnswers());
                close.add(c);
            }
            test.setCloseQuestions(close);

            List<SolvableOpenQuestion> open = new ArrayList<>();
            SolvableOpenQuestion o = null;
            for (int i = 0; i < test.getOpenQuestions().size(); i++) {
                o = test.getOpenQuestions().get(i);
                o.setAnswer(input.getOpenQuestions().get(i).getAnswer());
                o.setReceivedScore(input.getOpenQuestions().get(i).getReceivedScore());
                open.add(o);
            }
            test.setOpenQuestions(open);

            List<SolvableValueQuestion> value = new ArrayList<>();
            SolvableValueQuestion v = null;
            for (int i = 0; i < test.getValueQuestions().size(); i++) {
                v = test.getValueQuestions().get(i);
                v.setAnswer(input.getValueQuestions().get(i).getAnswer());
                v.setReceivedScore(input.getValueQuestions().get(i).getReceivedScore());
                value.add(v);
            }
            test.setValueQuestions(value);

            calculateClosed(test.getCloseQuestions());
            calculateValue(test.getValueQuestions());
            test.calculatePoints();

            test.setStatus(TestStatus.SOLVED.getValue());

            DynamoDBMapperConfig dynamoDBMapperConfig = new DynamoDBMapperConfig.Builder()
                    .withConsistentReads(DynamoDBMapperConfig.ConsistentReads.CONSISTENT)
                    .withSaveBehavior(DynamoDBMapperConfig.SaveBehavior.UPDATE)
                    .build();

            getMapper().save(test, dynamoDBMapperConfig);
            return new Response(200, "Test successfully saved");

        }

        return new Response(400, "Input can't be empty");
    }

    private void calculateClosed(List<SolvableClosedQuestion> closed) {
        closed.forEach(question -> {
            question.setReceivedScore(question.getChosenAnswers().stream()
                    .reduce(0, (sum, answer) -> sum + question.getAnswerScore() *
                            (question.getCorrectAnswers().contains(answer) ? 1 : -1)));
            if (question.getReceivedScore() < 0) question.setReceivedScore(0);
        });
    }

    private void calculateValue(List<SolvableValueQuestion> value) {
        value.forEach( question -> {
            question.setReceivedScore((Math.abs(question.getAnswer() - question.getCorrectAnswer()) < 0.01
                    ? question.getMaxScore() : 0));
        });
    }

}
