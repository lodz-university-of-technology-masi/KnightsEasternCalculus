package lambda.test;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.lambda.runtime.Context;
import com.fasterxml.jackson.databind.ObjectMapper;
import lambda.Handler;
import model.test.Test;
import util.Response;

import java.util.List;

public class GetAllTests extends Handler<Object> {
    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public Response handleRequest(Object input, Context context) {
        List<Test> tests = getMapper().scan(Test.class, new DynamoDBScanExpression());
        if (tests != null && tests.size() != 0) {
            return new Response(200, tests);
        } else {
            return new Response(404, "Could not get all tests");
        }
    }


//    @Override
//    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent input, Context context) {
//        List<Test> tests = dynamoDBMapper.scan(Test.class, new DynamoDBScanExpression());
//        String result = null;
//        try {
//            result = objectMapper.writeValueAsString(tests);
//        } catch (JsonProcessingException e) {
//            result = "Could not get all tests";
//        }
//        return getResponse(200, result);
//    }
}


