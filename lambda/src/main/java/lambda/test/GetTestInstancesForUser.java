package lambda.test;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.services.dynamodbv2.document.spec.QuerySpec;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.lambda.runtime.Context;
import lambda.Handler;
import model.test.TestInstance;
import util.Response;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GetTestInstancesForUser extends Handler<String> {
    @Override
    public Response handleRequest(String input, Context context) {
        Map<String, AttributeValue> attributeValues = new HashMap<>();
        attributeValues.put(":id", new AttributeValue().withS(input));

        DynamoDBQueryExpression<TestInstance> query = new DynamoDBQueryExpression<TestInstance>()
                .withKeyConditionExpression("applicantId = :id")
                .withExpressionAttributeValues(attributeValues);

        List<TestInstance> tab = getMapper().query(TestInstance.class, query);
        if (tab == null) {
            return new Response(404, "No tests for this user");
        } else {
            return new Response(200, tab);
        }
    }
}
