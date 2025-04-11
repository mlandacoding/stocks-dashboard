<?php

namespace App\Http\Controllers;

use App\Events\TaskAdded;
use App\Events\TaskDeleted;
use App\Events\TaskUpdated;
use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return view('tasks.index');

    }
    public function all(): JsonResponse
    {
        $tasks = Task::all();
        return response()->json([
            'tasks' => $tasks
        ]);
    }

    public function store(Request $request): Task
    {
        $task = Task::create($request->only('name'));
        broadcast(new TaskAdded($task))->toOthers();
        return $task;
    }

    public function update(Request $request, Task $task): Task
    {
        $task->update($request->only('title', 'completed'));
        broadcast(new TaskUpdated($task))->toOthers();
        return $task;
    }

    public function destroy(Task $task): JsonResponse
    {
        $task->delete();
        broadcast(new TaskDeleted($task))->toOthers();
        return response()->json(['status' => 'Task deleted']);
    }
}
