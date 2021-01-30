@extends('layouts.admin')
@section('content')

    <div class="card">
        <div class="card-header">
            Оплата
        </div>
        <div class="card-body">
            <table class="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>Текст</th>
                    <th>Рекомендованный платеж</th>
                    <th>Фактический платеж</th>
                    <th>Рекомендованая дата</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {{ $model->date }}
                        </td>
                        <td>
                            {{ $model->recommend_payment }}
                        </td>
                        <td>
                            {{ $model->fact_payment }}
                        </td>
                        <td>
                            {{ $model->source }}
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
