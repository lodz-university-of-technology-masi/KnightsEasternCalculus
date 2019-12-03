package lambda;

import CommunicationWithApiGateway.LambdaHelper;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import model.tests.Test;

public class DeleteTest extends LambdaHelper {

    @Override
    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent input, Context context) {
        Test test = getTestFormBody(input);
        if (test.getId() != null) {
            if (dynamoDBMapper.load(Test.class, test.getId()) != null) {
                dynamoDBMapper.delete(test);
                return getResponse(200, "Successfully deleted");
            }
        } return getResponse(404, "Such test does not exist");
    }
}
