@extends('layouts.admin')
@section('content')

    <div class="card">
        <div class="card-header">
            Пользователь: {{ $model->name }}
        </div>
        <div class="card-body">
            <table class="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Имя</th>
                    <th>Почта</th>
                    <th>Роль</th>
                </tr>
                </thead>
                <tbody>

                    <tr>
                    <tr>
                        <td>
                            {{ $model->id }}
                        </td>
                        <td>
                            {{ $model->name }}
                        </td>
                        <td>
                            {{ $model->email }}
                        </td>
                        <td>
                            {{ $model->role }}
                        </td>
                    </tr>

                </tbody>
            </table>
            <div>
                <a class="btn btn-xs btn-danger" href="{{route('users.index')}}">
                    Назад
                </a>
            </div>
        </div>
    </div>
@endsection
