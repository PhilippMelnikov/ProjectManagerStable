import app from './modules/main'

app.service('finalTaskListService', function() {

  // var daysInMonth = function(month,year) {
  //   return new Date(year, month, 0).getDate();
  // }

  var sortByDateAsc = function (obj1, obj2) {

    if (obj1.date > obj2.date) return 1;
    if (obj1.date < obj2.date) return -1;
    return 0;

  };

  var sortByDateDesc = function (obj1, obj2) {

    if (obj1.date > obj2.date) return -1;
    if (obj1.date < obj2.date) return 1;
    return 0;

  };
  var formatDate = function (userDate) {
    var date    = new Date(userDate),
    yr      = date.getFullYear(),
    month   = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1),
    day     = date.getDate()  < 9 ? '0' + date.getDate()  : date.getDate(),
    newDate = day + '.' + month + '.' + yr;
    return newDate;
  };

  var getDayOfWeek = function (date) {
    var string = "";
    var now = moment(new Date());
    var myDate = moment(date);

    if (myDate.isSame(now,'day'))
    {
      string = "Today";
      return string;
    }
    if (myDate.isSame(now.add(1, 'days'),'day'))
    {
      string = "Tomorrow";
      return string;
    }

    var day = date.getDay();


    switch (day) {
      case 0:
      string = "Sunday";
      break;
      case 1:
      string = "Monday";
      break;
      case 2:
      string = "Tuesday";
      break;
      case 3:
      string = "Wednesday";
      break;
      case 4:
      string = "Thursday";
      break;
      case 5:
      string = "Friday";
      break;
      case 6:
      string = "Saturday";
      break;
      default:
      string = 'Потом' ;
    }
    return string;

  };

  // var finalTaskList = [];
  var formTaskList = function (currentProject) { // sorting based on date
    var taskList = [];
    var tasks = currentProject.tasks;
    console.log('formTaskList');

    for (var key = 0; key<tasks.length; key++) 
    {

      if (taskList.length<1)
      {
        var taskObject = new Object();
        taskObject.date = tasks[key].date;
        taskObject.tasks = [tasks[key].text];
        
        taskList.push(taskObject);
      }
      else
      {
        var flag = false;
        for (var taskListKey = 0; taskListKey<taskList.length; taskListKey++)
        {
          if(moment(taskList[taskListKey].date).isSame(moment(tasks[key].date),'day'))
          {
            taskList[taskListKey].tasks.push(tasks[key].text);
            flag = true;
          }
        }
        if(flag)
        {
          continue;
        }
        var taskObject = new Object();
        taskObject.date = tasks[key].date;
        taskObject.tasks = [tasks[key].text];

        taskList.push(taskObject);

      }
    }
    taskList.sort(sortByDateAsc);
    for (var i = 0; i < taskList.length; i++)
    {
      taskList[i].dayOfWeek = getDayOfWeek(taskList[i].date);
      taskList[i].date = formatDate(taskList[i].date);
    }

      // finalTaskList = taskList;
      return taskList;

    };

    return {
      formTaskList: formTaskList
    };
  } )