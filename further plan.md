1. user should see feed right after signup (login page is not necessary right aafter )
2. save userinfo like username or id for helping in routes maintainance
3. change user model of mongodb
   add - name,
          bio,
          link,
          profile photo
          followers,
          following,
    
    another table - posts,
                    likes,
                    comment,
                    userid

Problem - same username and eamail se signup ho jaa rha



29 jan 2024 - make a userpic filed in comment array and show pics with every comment


im making an insta clone in which i have posts so when i post and refresh the page it gives me 304 status and doesnt add the newly posted post.....im making the getposts api call via swr in next js project like this const { data:allPosts, error:postError } = useSWR('/api/posts/getallposts', fetcher)


3 Feb 2024 - all Apis except login and signup (i think all get method apis) are giving 304 (not modified) status on live site....locally everything works fine 

6 feb 2024 -
-----------
-> humne allmessages api ko userone and usertwo se find karke ni fetch kiya hai jiski wajah se saare msg saare users l chat page pe dikh rhe hai to all messages ki api update karni hai...usko post request banana hai aur usko update krke frontend update krna hai

-> humne chat model k message field me sender ni bheja to model me change krke fir update chat api ko update krke frontend pe localstorage se username fetch krke usko har sender se match karaenge....agar match ho gya to message para me float right class aur match ni hua to message para me float left class add krenge