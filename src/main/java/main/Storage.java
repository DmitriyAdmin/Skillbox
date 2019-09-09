package main;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import main.model.Task;

public class Storage {

  private static int currentId = 1;

  private static ConcurrentMap<Integer, Task> tasks = new ConcurrentHashMap<>();

  public static List<Task> getAllTasks() {
    ArrayList<Task> taskList = new ArrayList<>();
    taskList.addAll(tasks.values());
    return taskList;
  }

  public static int addTask(Task task) {
    int id = currentId++;
    task.setId(id);
    tasks.put(id, task);
    return id;
  }

  public static Task getTask(int taskId) {
    if (tasks.containsKey(taskId)) {
      return tasks.get(taskId);
    }
    return null;
  }

  public static boolean deleteTask(int taskId) {
    return tasks.remove(taskId) == null ? false : true;
  }
}
