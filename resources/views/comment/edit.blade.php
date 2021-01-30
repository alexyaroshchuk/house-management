@extends('layouts.admin')
@section('content')

    <div class="card">
        <div class="card-header">
            Изменение апартаментов
        </div>

        <div class="card-body">
            <form action="{{ route("comments.update", [$model->id]) }}" method="POST" enctype="multipart/form-data">
                @csrf
                @method('PUT')
                <div class="form-group {{ $errors->has('text') ? 'has-error' : '' }}">
                    <label for="name">Текст комментария</label>
                    <input type="text" id="text" name="text" class="form-control" value="{{ old('text', isset($model) ? $model->text : '') }}">
                    @if($errors->has('text'))
                        <em class="invalid-feedback">
                            {{ $errors->first('text') }}
                        </em>
                    @endif
                </div>
                <div>
                    <a class="btn btn-xs btn-danger" href="{{route('apartments.index')}}">
                        Назад
                    </a>
                    <input class="btn btn-xs btn-success" type="submit" value="Сохранить">
                </div>
            </form>
        </div>
    </div>

@endsection
