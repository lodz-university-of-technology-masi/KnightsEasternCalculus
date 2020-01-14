package lambda.test;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperConfig;
import com.amazonaws.services.lambda.runtime.Context;
import lambda.Handler;
import model.test.*;
import util.Response;

import java.util.ArrayList;
import java.util.List;

public class GradeTest extends Handler<TestInstance> {

    @Override
    public Response handleRequest(TestInstance input, Context context) {
        if (input != null) {
            TestInstance test = getMapper().load(TestInstance.class, input.getApplicantId(), input.getTimestamp());

            if (test.getApplicantId() == null) {
                return new Response(400, "ApplicantID can't be null");
            }

            test.setReceivedScore(0);

            List<SolvableOpenQuestion> open = new ArrayList<>();
            SolvableOpenQuestion o = null;
            for (int i = 0; i < test.getOpenQuestions().size(); i++) {
                o = test.getOpenQuestions().get(i);
                o.setAnswer(input.getOpenQuestions().get(i).getAnswer());
                o.setReceivedScore(input.getOpenQuestions().get(i).getReceivedScore());
                o.setCorrectAnswer(input.getOpenQuestions().get(i).getCorrectAnswer());
                open.add(o);
            }

            List<SolvableValueQuestion> value = new ArrayList<>();
            SolvableValueQuestion v = null;
            for (int i = 0; i < test.getValueQuestions().size(); i++) {
                v = test.getValueQuestions().get(i);
                v.setAnswer(input.getValueQuestions().get(i).getAnswer());
                v.setReceivedScore(input.getValueQuestions().get(i).getReceivedScore());
                v.setCorrectAnswer(input.getValueQuestions().get(i).getCorrectAnswer());
                value.add(v);
            }

            test.setValueQuestions(value);
            test.setOpenQuestions(open);

            test.calculatePoints();

            test.setStatus(TestStatus.CHECKED.getValue());

            DynamoDBMapperConfig dynamoDBMapperConfig = new DynamoDBMapperConfig.Builder()
                    .withConsistentReads(DynamoDBMapperConfig.ConsistentReads.CONSISTENT)
                    .withSaveBehavior(DynamoDBMapperConfig.SaveBehavior.UPDATE)
                    .build();

            getMapper().save(test, dynamoDBMapperConfig);
            return new Response(200, "Test successfully saved");

        }

        return new Response(400, "Input can't be empty");
    }
}
