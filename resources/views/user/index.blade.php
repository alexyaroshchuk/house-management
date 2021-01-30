@extends('layouts.admin')
@section('content')
    @if(Auth::check())
    <div style="margin-bottom: 10px;" class="row">
        <div class="col-lg-12">
            <a class="btn btn-success" href="{{ route("users.create") }}">
               Создать пользователя
            </a>
        </div>
    </div>
    @endif
    <div class="card">
        <div class="card-header">
            Список пользователей
        </div>

        <div class="card-body">
            <div class="table-responsive">

                <table class=" table table-bordered table-striped table-hover datatable">
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Имя</th>
                        <th>Почта</th>
                        <th>Роль</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($models as $index => $model)
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
                            <td>
                                <a class="btn btn-xs btn-primary" href="{{ route('users.show', $model->id) }}">
                                    Просмотреть
                                </a>
                                @if(Auth::check())
{{--                                    <a class="btn btn-xs btn-info" href="{{ route('users.edit', $model->id) }}">--}}
{{--                                        Изменить--}}
{{--                                    </a>--}}
                                    <form method="POST" action="{{route('users.destroy', $model->id) }}" style="display: inline-block;">
                                        {{ csrf_field() }}
                                        {{ method_field('DELETE') }}

                                        <div class="form-group">
                                            <input type="submit" class="btn btn-xs btn-danger delete-user" value="Delete">
                                        </div>
                                    </form>
                                @endif
                            </td>

                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
@section('scripts')
    @parent
    <script>
        $('.delete-user').click(function(e){
            e.preventDefault() // Don't post the form, unless confirmed
            if (confirm('Are you sure?')) {
                // Post the form
                $(e.target).closest('form').submit() // Post the surrounding form
            }
        });
    </script>
@endsection
@endsection
