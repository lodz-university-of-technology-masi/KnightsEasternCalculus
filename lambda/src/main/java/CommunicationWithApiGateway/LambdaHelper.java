package CommunicationWithApiGateway;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.fasterxml.jackson.databind.ObjectMapper;
import model.test.Test;

import java.io.IOException;

public abstract class LambdaHelper implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
    protected ObjectMapper objectMapper = new ObjectMapper();
    protected DynamoDBMapper dynamoDBMapper = new DynamoDBMapper(AmazonDynamoDBClientBuilder.defaultClient());
    protected APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();

    @Override
    public abstract APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent input, Context context);

    protected APIGatewayProxyResponseEvent getResponse(int statusCode, String message){
        response.setStatusCode(statusCode);
        response.setBody(message);
        return response;
    }

    protected Test getTestFormBody(APIGatewayProxyRequestEvent input) {
        try {
            return new Test(objectMapper.readValue(input.getBody(), Test.class));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
