package main;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicIntegerFieldUpdater;
import main.model.Task;

public class Storage {

  private static AtomicInteger currentId = new AtomicInteger(1);

  private static ConcurrentMap<Integer, Task> tasks = new ConcurrentHashMap<>();

  public static List<Task> getAllTasks() {
    ArrayList<Task> taskList = new ArrayList<>();
    taskList.addAll(tasks.values());
    return taskList;
  }

  public static int addTask(Task task) {
    int id = currentId.incrementAndGet();
    task.setId(id);
    tasks.put(id, task);
    return id;
  }

  public static Task getTask(int taskId) {
      return tasks.get(taskId);
  }

  public static boolean deleteTask(int taskId) {
    return tasks.remove(taskId) == null ? false : true;
  }
}
