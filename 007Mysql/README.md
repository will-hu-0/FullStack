## Assignment

Questions

1. **What should be done to make users pair insertion unique i.e. to avoid duplicate user relationship creation?**

   Answer: Set user_one_id, user_two_id as primary key in table relationship.

   

2. **What will be the insert query to insert a new Friend request sent by user 1 to user 2?**

   Answer: 

   ```sql
   Insert into relationship values (1, 2, 0, 1);
   ```

   

3. **What will be the query to update the status of the friend request i.e. accepting friend request sent to user 2 by user 1?**

   Answer:

   ```sql
   Update relationship set status = 1, action_user_id = 2 where user_one_id = 1 and user_two_id = 2;
   ```

   

4. **What will be the query to check if any two users are friends?**

   Answer:

   ```sql
   Select * from relationship where ((user_one_id = <user1> and user_two_id = <user2>) or (user_one_id = <user2> and user_two_id = <user1>)) and status = 1;
   ```

   

5. **What will be the query to retrieve all the users’friends? Here user 1 is the logged in user.**

   Answer:

   ```sql
   Select * from relationship where (user_one_id = 1 or user_two_id = 1) and status = 1;
   ```

   

6. **What will be the query to get the entire pending user request for the user from other users? Here user 1 is logged in**

   Answer:

   ```sql
   Select * from relationship where user_two_id = 1 and status = 0;
   ```

   

7. **What will be the query to retrieve the friend request status when the logged in user visits the profile of another user? Here, user 1 is the logged in user. User 1 visits the profile of user7**

   Answer:

   ```sql
   Select status from relationship where (user_one_id = 1 and user_two_id = 7) or (user_one_id = 7 and user_two_id = 1);
   ```

   

