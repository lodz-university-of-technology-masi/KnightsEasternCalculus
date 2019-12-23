package lambda.test;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperConfig;
import com.amazonaws.services.lambda.runtime.Context;
import lambda.Handler;
import model.test.Test;
import util.Response;

public class UpdateTest extends Handler<Test> {
    private DynamoDBMapperConfig dynamoDBMapperConfig = new DynamoDBMapperConfig.Builder()
            .withConsistentReads(DynamoDBMapperConfig.ConsistentReads.CONSISTENT)
            .withSaveBehavior(DynamoDBMapperConfig.SaveBehavior.UPDATE)
            .build();

    @Override
    public Response handleRequest(Test input, Context context) {
        if (input.getId() != null) {
            if (getMapper().load(Test.class, input.getId()) != null) {
                getMapper().save(input, dynamoDBMapperConfig);
                return new Response(200, "Succesfully edited");
            }
        }
        return new Response(404, "Such test does not exist");
    }
}
