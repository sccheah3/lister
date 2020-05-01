# Just Another To-Do List

You guessed it, this project is Just Another To-Do List. Please bear with me while I talk about why this project is worth looking into.


## Motivation

The thing about me is that I stress a lot over tiny details to the point where I start to drive myself crazy. 
My solution to this was to open up a text editor and just type out all the tasks, including sub-tasks, that I need to do. Oftenly, those sub-tasks needed more sub-tasks, leading up to an ugly mess of a list. 

I searched for apps out there that have the feature to add **virtually infinite** sub-tasks to no avail. Wanting to gain experience developing both front and backend out, this was the perfect opportunity to kill two birds with one stone. 


## Stack

I used **Django Rest Framework** to implement APIs on the backend. A couple extra packages are **knox token authentication** and **django_filters**.
On the frontend, I used **React** while using **React-Router** to handle routing.

The applications are deployed on an **Nginx** server. The WSGI server used for my backend is **Gunicorn**, because who doesn't like unicorns?


## Challenges

Being relatively new to web devlopment, I basically had to learn everything I did for this project, since I don't have experience with these frameworks and libraries. Also, this is my first time deploying a site live on the internet. 

Looking at the problem, we want to be able to have multiple lists that can span their own sub-lists. We can immediately identify this as a tree. We can further inspect this by looking at the **List** model. 


```
class List(models.Model):
	parent_list = models.ForeignKey('self', related_name='tasks', null=True, on_delete=models.CASCADE)
	owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='lists', null=True, on_delete=models.CASCADE)
	title = models.CharField(max_length=256)
	is_complete = models.BooleanField(default=False)
	...
```

We can see that the **List** model has a many-to-one relationship to itself. Basically, because of this many-to-one recursive relationship, this model is essentially a tree. One issue we have here is if a client makes an API call that happens to create a cycle in this graph. We want to make this model an **acyclic graph**. To check for this, we can simply check whether a cycle occurs each time a client tries to PUT or PATCH a new list in the serializers. We are able to achieve this check in O(n) time, where n is the numbers of layers deep the sub-lists are, by following the parent_list upwards as if we were traversing a linked list until we hit null. If we are in a loop, eventually it will go back to the head List node. We don't have to worry about POST requests because, as of this moment, the API does not support creating multiple lists in a single request, meaning there is no children in the request to make a new list so a loop cannot occur.


## API

*Examples are shown using httpie.*

### Authentication

#### Sign up and receive token:
```
http POST http://api.just-another-todo-list.stanleycheah.tech/accounts/auth/register/ username=test_user password=test_pass
```

#### Login and receive token:
```
http POST http://api.just-another-todo-list.stanleycheah.tech/accounts/auth/login/ username=test_user password=test_pass
```

### GET All Lists:

```
http GET http://api.just-another-todo-list.stanleycheah.tech/lister/api/lists/ "Authorization: Token [INSERT YOUR TOKEN]"
```

### GET Specific List:

```
http GET http://api.just-another-todo-list.stanleycheah.tech/lister/api/lists/[LIST ID]/ "Authorization: Token [INSERT YOUR TOKEN]"
```

### DELETE List:
```
http DELETE http://api.just-another-todo-list.stanleycheah.tech/lister/api/lists/[LIST ID]/ "Authorization: Token [INSERT YOUR TOKEN]"
```

### POST List:
```
http POST http://api.just-another-todo-list.stanleycheah.tech/lister/api/lists/ "Authorization: Token [INSERT YOUR TOKEN]" title="here is a title" 
```


### Filter for Root Lists:
```
http GET http://api.just-another-todo-list.stanleycheah.tech/lister/api/lists/?is_root=true "Authorization: Token [INSERT YOUR TOKEN]" 
```


### Search for Lists Based On Title:
```
http GET http://api.just-another-todo-list.stanleycheah.tech/lister/api/lists/?search=[SEARCH FIELD] "Authorization: Token [INSERT YOUR TOKEN]" 
```
















