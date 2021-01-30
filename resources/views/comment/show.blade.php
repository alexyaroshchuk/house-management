@extends('layouts.admin')
@section('content')

    <div class="card">
        <div class="card-header">
            Комментарий
        </div>
        <div class="card-body">
            <table class="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>Текст</th>
                    <th>Дата</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {{ $model->text }}
                        </td>
                        <td>
                            {{ $model->created_at }}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div>
                <a class="btn btn-xs btn-danger" href="{{route('apartments.index')}}">
                    Назад
                </a>
            </div>
        </div>
    </div>

@endsection
