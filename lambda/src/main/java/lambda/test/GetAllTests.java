package lambda.test;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.lambda.runtime.Context;
import lambda.Handler;
import model.applicant.ApplicantListItem;
import model.test.Test;
import util.Response;
import util.Utils;

import java.util.*;

public class GetAllTests extends Handler<String> {

    @Override
    public Response handleRequest(String input, Context context) {
        DynamoDBScanExpression scanExpression;
        input = input.toLowerCase();

        if(input.isEmpty()) {
            scanExpression = new DynamoDBScanExpression();
        } else {
            Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
            eav.put(":val", new AttributeValue().withS(input));

            scanExpression = new DynamoDBScanExpression()
                    .withFilterExpression("contains(searchTitle, :val)")
                    .withExpressionAttributeValues(eav);
        }

        List<Test> queryList = new ArrayList<>(getMapper().scan(Test.class, scanExpression));
        queryList.sort(Comparator.comparing(Test::getTitle));
        queryList.forEach(replicant -> replicant.setSearchTitle(null));
        return new Response(200, queryList);
    }
}


