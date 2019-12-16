package lambda.test;

import com.amazonaws.services.lambda.runtime.Context;
import lambda.Handler;
import model.test.Test;
import util.Response;

import java.io.IOException;

public class DeleteTest extends Handler<Test> {

    @Override
    public Response handleRequest(Test input, Context context) {
        if (input.getId() != null) {
            if (getMapper().load(Test.class, input.getId()) != null) {
                getMapper().delete(input);
                return new Response(200, "Successfully deleted");
            }
        }
        return new Response(404, "Such test does not exist");
    }

//    @Override
//    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent input, Context context) {
//        Test test = getTestFormBody(input);
//        if (test.getId() != null) {
//            if (dynamoDBMapper.load(Test.class, test.getId()) != null) {
//                dynamoDBMapper.delete(test);
//                return getResponse(200, "Successfully deleted");
//            }
//        } return getResponse(404, "Such test does not exist");
//    }
}
