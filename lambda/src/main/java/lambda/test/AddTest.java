package lambda.test;

import CommunicationWithApiGateway.LambdaHelper;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import model.test.Test;

public class AddTest extends LambdaHelper {

    @Override
    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent input, Context context) {
        Test test = getTestFormBody(input);
        if (test != null) {
            if (test.getId() == null) {
                dynamoDBMapper.save(test);
                return getResponse(200, "Test added succesfully");
            } else {
                if (dynamoDBMapper.load(Test.class, test.getId()) == null) {
                    dynamoDBMapper.save(test);
                    return getResponse(200, "Test added succesfully");
                } else return getResponse(500, "Test did not added (such test exists)");
            }
        } else return getResponse(500, "Test did not added");
    }
}
