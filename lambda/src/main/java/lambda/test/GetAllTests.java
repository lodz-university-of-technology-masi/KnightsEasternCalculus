package lambda.test;

import CommunicationWithApiGateway.LambdaHelper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.fasterxml.jackson.core.JsonProcessingException;
import model.test.Test;

import java.util.List;

public class GetAllTests extends LambdaHelper {
    @Override
    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent input, Context context) {
        List<Test> tests = dynamoDBMapper.scan(Test.class, new DynamoDBScanExpression());
        String result = null;
        try {
            result = objectMapper.writeValueAsString(tests);
        } catch (JsonProcessingException e) {
            result = "Could not get all tests";
        }
        return getResponse(200, result);
    }
}


