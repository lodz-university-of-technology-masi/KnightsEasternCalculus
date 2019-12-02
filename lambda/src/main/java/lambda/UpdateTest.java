package lambda;

import CommunicationWithApiGateway.LambdaHelper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperConfig;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import model.tests.Test;

public class UpdateTest extends LambdaHelper {
    private DynamoDBMapperConfig dynamoDBMapperConfig = new DynamoDBMapperConfig.Builder()
            .withConsistentReads(DynamoDBMapperConfig.ConsistentReads.CONSISTENT)
            .withSaveBehavior(DynamoDBMapperConfig.SaveBehavior.UPDATE)
            .build();

    @Override
    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent input, Context context) {
        Test test = this.getTestFormBody(input);
        if(test.getId() != null){
            if (dynamoDBMapper.load(Test.class, test.getId()) != null) {
                dynamoDBMapper.save(test, dynamoDBMapperConfig);
                return getResponse(200, "Succesfully edited");
            }
        } return getResponse(500, "Such test does not exist");
    }
}
