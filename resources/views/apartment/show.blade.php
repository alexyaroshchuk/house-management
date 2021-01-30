@extends('layouts.admin')
@section('content')

    <div class="card">
        <div class="card-header">
            Объект: {{$model->type}} <br> Номер: {{ $model->number }}
            <a style="float: right" class="btn btn-xs btn-info" href="{{ route('apartments.edit', $model->id) }}">
                Изменить
            </a>
        </div>

        <div class="card-body">
            <table class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Номер</th>
                        <th>Цена в грн</th>
                        <th>Этаж</th>
                        <th>Номер контракта</th>
                        <th>Первый платеж</th>
                        <th>Сумма платежей</th>
                        <th>Кол-во платежей</th>
                        <th>Процент выплаты</th>
                        <th>Статус</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {{ $model->number }}
                        </td>
                        <td>
                            {{ $model->price }}
                        </td>
                        <td>
                            {{ $model->floor }}
                        </td>
                        <td>
                            {{ $model->contract_number }}
                        </td>
                        <td>
                            {{ $model->first_payment }}
                        </td>
                        <td>
                            {{ $model->totalPayment }}
                        </td>
                        <td>
                            {{ $model->count_payments }}
                        </td>
                        <td>
                            {{ $model->percent }}
                        </td>
                        <td>
                            {{ $model->status }}
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

    <div class="card">
        <div class="card-header">
            Комментарии
            <a class="btn btn-success" style="float: right" href="{{ route("add-comment-to-apartment", $model->id) }}">
                Добавить комментарий
            </a>
        </div>
        @if(count($model->comments) > 0)
            <div class="card-body">
            <table class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Текст</th>
                        <th>Дата</th>
                        <th>Действие</th>
                    </tr>

                </thead>
                <tbody>
                    @foreach($model->comments as $index => $comment)
                        <tr>
                            <td>
                                {{ $index+1 }}
                            </td>
                            <td>
                                {{ $comment->text }}
                            </td>
                            <td>
                                {{ $comment->created_at }}
                            </td>
                            <td>
                                @if(Auth::check())
                                    <a class="btn btn-xs btn-info" href="{{ route('comments.edit', $comment->id) }}">
                                        Изменить
                                    </a>
                                    <form method="POST" action="{{route('comments.destroy', $comment->id) }}" style="display: inline-block;">
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
        @endif
    </div>

    <div class="card">
        <div class="card-header">
            Платежи
            <a class="btn btn-success" style="float: right" href="{{ route("add-payment-to-apartment", $model->id) }}">
                Добавить платеж
            </a>
        </div>
        @if(count($model->payments) > 0)
            <div class="card-body">
            <table class="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Рекомендованый платеж</th>
                    <th>Фактический платеж</th>
                    <th>Источник</th>
                    <th>Дата</th>
                    <th>Действие</th>
                </tr>
                </thead>
                <tbody>
                @foreach($model->payments as $index => $payment)
                    <tr>
                        <td>
                            {{ $index+1 }}
                        </td>
                        <td>
                            {{ $payment->recommend_payment }}
                        </td>
                        <td>
                            {{ $payment->fact_payment }}
                        </td>
                        <td>
                            {{ $payment->source }}
                        </td>
                        <td>
                            {{ $payment->date }}
                        </td>
                        <td>
                            @if(Auth::check())
                                <a class="btn btn-xs btn-info" href="{{ route('payments.edit', $payment->id) }}">
                                    Изменить
                                </a>
                                <form method="POST" action="{{route('payments.destroy', $payment->id) }}" style="display: inline-block;">
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
        @endif
    </div>

@endsection
