package lambda.test;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.lambda.runtime.Context;
import lambda.Handler;
import model.test.TestInstance;
import util.Response;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GetUncheckedTestInstances extends Handler<String> {
    @Override
    public Response handleRequest(String input, Context context) {
        Map<String, AttributeValue> eav = new HashMap<>();
        eav.put(":s", new AttributeValue().withN("1"));

        Map<String, String> names = new HashMap<>();
        names.put("#st", "status");

        DynamoDBScanExpression scan = new DynamoDBScanExpression()
                .withFilterExpression("#st = :s")
                .withExpressionAttributeValues(eav)
                .withExpressionAttributeNames(names);

        List<TestInstance> scanList = new ArrayList<>(getMapper().scan(TestInstance.class, scan));
        return new Response(200, scanList);
    }
}
