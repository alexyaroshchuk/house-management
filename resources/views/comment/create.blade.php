@extends('layouts.admin')
@section('content')

    <div class="card">
        <div class="card-header">
            Добавить комментарий
        </div>

        <div class="card-body">
            <form action="{{ route("comments.store") }}" method="POST" enctype="multipart/form-data">
                @csrf
                <div class="form-group {{ $errors->has('text') ? 'has-error' : '' }}">
                    <label for="name">Текст комментария</label>
                    <input type="text" id="text" name="text" class="form-control" value="{{ old('text', isset($model) ? $model->text : '') }}">
                    @if($errors->has('text'))
                        <em class="invalid-feedback">
                            {{ $errors->first('text') }}
                        </em>
                    @endif
                </div>
                <input hidden type="text" id="apartment_id" name="apartment_id" class="form-control" value="{{ old('apartment_id', isset($apartment_id) ? $apartment_id : '') }}">
                <div>
                    <a class="btn btn-xs btn-danger" href="{{route('apartments.show', $apartment_id)}}">
                        Назад
                    </a>
                    <input class="btn btn-xs btn-success" type="submit" value="Сохранить">
                </div>
            </form>
        </div>
    </div>

@endsection