package lambda.applicant;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.lambda.runtime.Context;
import lambda.Handler;
import model.applicant.ApplicantListItem;
import util.Response;
import util.Utils;

import java.util.*;

public class GetApplicants extends Handler<String> {

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
                    .withFilterExpression("contains(lastName, :val)")
                    .withExpressionAttributeValues(eav)
                    .withProjectionExpression("id, firstName, lastName, email, universities");
        }

        List<ApplicantListItem> queryList = new ArrayList<>(getMapper().scan(ApplicantListItem.class,scanExpression));
        queryList.sort(Comparator.comparing(ApplicantListItem::getLastName));
        queryList.forEach(replicant -> replicant.setLastName(Utils.capitalize(replicant.getLastName())));
        return new Response(200, queryList);
    }

}
