package lambda.test;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.lambda.runtime.Context;
import lambda.Handler;
import model.test.Test;
import util.Response;

import java.util.List;

public class GetAllTests extends Handler<Object> {

    @Override
    public Response handleRequest(Object input, Context context) {
        List<Test> tests = getMapper().scan(Test.class, new DynamoDBScanExpression());
        if (tests != null) {
            return new Response(200, tests);
        } else {
            return new Response(404, "Could not get all tests");
        }
    }
}


