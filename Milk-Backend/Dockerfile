ARG RUST_VERSION=1.84.1
ARG APP_NAME=Milk-Backend
FROM rust:${RUST_VERSION} AS build
ARG APP_NAME
WORKDIR /app


RUN 
# THx docker docks :D
#For taking advatange of rust cache
RUN --mount=type=bind,source=src,target=src \
  --mount=type=bind,source=Cargo.toml,target=Cargo.toml \
  --mount=type=bind,source=Cargo.lock,target=Cargo.lock \
  --mount=type=cache,target=/app/target/ \
  --mount=type=cache,target=/usr/local/cargo/registry/ \
  <<EOF
set -e
cargo build --release --locked
cp ./target/release/$APP_NAME /bin/server
EOF


FROM rust:${RUST_VERSION} AS final



COPY ./resources/ /resources/
COPY --from=build /bin/server /bin/

EXPOSE 5050

CMD ["/bin/server"]


